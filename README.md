# emp_mern_demo

Run the following command from the project root to build and run the containers
```sh
sudo docker-compose -f dev-docker-compose.yml up --build
```
## REST API Endpoints
### List Employees
To list employees, send a GET request to http://localhost:8000/api/employees. You can also specify a **limit** query string to control how many employees will be returned in the response. For switching **pages**, simply specify a page query string. By default the results are ordered from latest to oldest employee (desc). You can change this by specifying an **order** query string and setting it to 'asc'. You can put it all together and send this request for example
```sh
curl http://localhost:8000/api/employees?limit=2&page=2&order=asc
```
### Search Employees
Searching employees by name is pretty straight forward. You just specify a **search** query string and set it to the name of the employee you want to find. You can also use all the query strings mentioned above together with the **search** query string.
### Create an Employe
To add an employee, send a POST request to http://localhost:8000/api/employees/:id and add a name, dob, gender and salary inside the request body.
### Update Employee
You can edit an employee's information by sending a PUT request to http://localhost:8000/api/employees/:id and add the fields you want to change in the request body.
### Delete Employee
To remove an employee, just send a DELETE request to http://localhost:8000/api/employees/:id.
