import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
    CustomPaging,
    DataTypeProvider,
    IntegratedSorting,
    PagingState,
    SearchState,
    SortingState
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    Toolbar,
    TableHeaderRow,
    PagingPanel,
    SearchPanel,
    VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import { Employee, RootState } from '../../models';
import { loadEmployees } from '../../actions/employees';
import Loading from '../loading';
import { ToolbarAddButton, ToolbarRefreshButton } from '../plugins/ToolbarButtons';
import AddEmployeeDialog from './AddEmployeeDialog';
import DeleteEmployeeDialog from './DeleteEmployeeDialog';
import EditEmployeeDialog from './EditEmployeeDialog';

const CurrencyFormatter = (props: { value: number }) => (
    <b style={{ color: 'darkblue' }}>
      {props.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
    </b>
  );
  
const CurrencyTypeProvider = (props: { for: Array<string> }) => (
    <DataTypeProvider
        formatterComponent={CurrencyFormatter}
        {...props}
    />
);

const EmployeesTable = () => {
    const dispatch = useDispatch();
    const rows: Employee[] = useSelector((state: RootState) => state.employees.data) || [];
    const [columns] = useState([
        {
            name: 'name',
            title: 'Name'
        },
        {
            name: 'dob',
            title: 'Date of Birth',
            getCellValue: (row: Employee) => row.dob ? new Date(row.dob).toDateString() : undefined
        },
        {
            name: 'gender',
            title: 'Gender',
            getCellValue: (row: Employee) => row.gender ? row.gender === 'female' ? 'Female' : 'Male' : undefined
        },
        {
            name: 'salary',
            title: 'Salary'
        },
        {
            name: 'actions',
            title: 'Actions'
        }
    ]);
    const [sortingStateColumnExtensions] = useState([
        { columnName: 'actions', sortingEnabled: false },
    ]);
    const [currencyColumns] = useState(['salary']);
    const loading: boolean = useSelector((state: RootState) => state.loading);
    const currentPage: number = useSelector((state: RootState) => state.employees.meta.page!.current_page);
    const perPage: number = useSelector((state: RootState) => state.employees.meta.page!.per_page);
    const total: number = useSelector((state: RootState) => state.employees.meta.page!.total);
    const [pageSizes] = useState([5, 10, 15, 0]);
    const [limit, setLimit] = useState(perPage);
    const [page, setPage] = useState(currentPage);
    const [openAddEmployeeDialog, setOpenAddEmployeeDialog] = useState(false);
    const [openEditEmployeeDialog, setOpenEditEmployeeDialog] = useState(false);
    const [openDeleteEmployeeDialog, setOpenDeleteEmployeeDialog] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState({} as Employee);
    const [deletedEmployee, setDeletedEmployee] = useState({} as Employee);

    const currentPageChanged = (page: number) => {
        setPage(page);
        dispatch(loadEmployees({
            limit,
            page,
        }));
    };

    const pageSizeChanged = (limit: number) => {
        setLimit(limit);
        dispatch(loadEmployees({
            limit,
            page
        }));
    };

    const searchValueChanged = (search: string) => {
        dispatch(loadEmployees({
            limit,
            page,
            search
        }));
    }

    const addActionButtons = (employee: Employee) => (
        <Fragment>
            <IconButton onClick={() => handleEdit(employee)}>
                <EditIcon />
            </IconButton>
            <IconButton color="secondary" onClick={() => handleDelete(employee)}>
                <DeleteIcon />
            </IconButton>
        </Fragment>
    );

    const handleEdit = (employee: Employee): void => {
        setEditedEmployee(employee);
        setOpenEditEmployeeDialog(true);
    }

    const handleDelete = (employee: Employee): void => {
        setDeletedEmployee(employee);
        setOpenDeleteEmployeeDialog(true);
    }
    
    useEffect(() => {
        dispatch(loadEmployees({}));
    }, [dispatch]);

    return (
        <Paper>
            <Grid
                rows={rows.map(row => ({
                    ...row,
                    actions: addActionButtons(row)
                }))}
                columns={columns}>
                <CurrencyTypeProvider
                    for={currencyColumns}
                />
                <PagingState
                    currentPage={page}
                    onCurrentPageChange={currentPageChanged}
                    pageSize={limit}
                    onPageSizeChange={pageSizeChanged}
                />
                <CustomPaging
                    totalCount={total}
                />
                <SearchState onValueChange={searchValueChanged} />
                <SortingState columnExtensions={sortingStateColumnExtensions} />
                <IntegratedSorting />
                <Table />
                <VirtualTable height="65vh" />
                <TableHeaderRow showSortingControls />
                <PagingPanel
                    pageSizes={pageSizes}
                />
                <Toolbar />
                <SearchPanel />
                <ToolbarAddButton onClick={() => setOpenAddEmployeeDialog(true)} />
                <ToolbarRefreshButton onClick={() => dispatch(loadEmployees({}))} />
            </Grid>
            {loading && <Loading />}
            <AddEmployeeDialog
                open={openAddEmployeeDialog}
                setOpen={setOpenAddEmployeeDialog}
            />
            <EditEmployeeDialog
                employee={editedEmployee}
                open={openEditEmployeeDialog}
                setOpen={setOpenEditEmployeeDialog}
            />
            <DeleteEmployeeDialog
                employee={deletedEmployee}
                open={openDeleteEmployeeDialog}
                setOpen={setOpenDeleteEmployeeDialog}
            />
        </Paper>
    );
}

export default EmployeesTable;
