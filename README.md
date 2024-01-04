# DriveSync

DriveSync is an application built to help car dealerships manage their inventory, sales, and service records.

## How to Run this App

** Required software includes Git, Docker and Node.JS **

1. Fork and clone repository to your local machine:
   git clone https://gitlab.com/vchiang/drive-sync.git

2. Run the following commands in your terminal to create a volume, build an image, and run containers:
   docker volume create <<volume-name>>
   docker-compose build
   docker-compose up

3. Open browser to http://localhost:3000/

## Design

    DriveSync is a microservices application made up of three separate services which communicate with one another via pollers. It integrates data and information application-wide to create a fully functional and efficient dealership data-management platform. The three microservices are Service, Sales, and Inventory.

## Diagram

Link to diagram: https://fuchsia-bearskin-7d1.notion.site/DriveSync-Diagram-74e7a79f42a6436b9d8f24fde5fe1d03

## Service microservice

    The service microservice provides a way for a dealership to track service appointments, appointment history, technicians, customers, and date-times. This service integrates with inventory and sales to allow the tracking of whether a vehicle has been sold. The service appointments allow tracking based on status, whether it has been created, finished or canceled.

    There is a poller set up which communicates with the inventory service to create value objects based off of inventory objects stored in the database. This allows the service microservice to have a reference for automobiles that have been sold, giving those customers VIP status when creating a service appointment.

## Sales microservice

    ​The sales application tracks salespeople (employees), customers, and the car sales that have been made. A poller syncs automobile data to an AutoVO object in the sales app from the inventory.

    Cars available to be sold are tracked through a sold flag. Only unsold cars are displayed on the sales form. After a sale has been made and a record of sale has been submitted through the sales form, the automobile's sold status is updated in the inventory app, where it is subsequently synced via polling in Sales and Service.

## API Documentation, URLs and Ports

### Service API

​ ### Technicians

    Action | Method | URL

    List technicians | GET | http://localhost:8080/api/technicians/
    Create Technician | POST | http://localhost:8080/api/technicians/
    Technician details | GET | http://localhost:8080/api/technicians/id/
    Delete technician | DELETE | http://localhost:8080/api/technicians/id/


    LIST TECHNICIANS: Provides a list of all existing technicians in the database. This request does not require any data input.
        EXPECTED RESPONSE:

            {
    "technicians": [
    	{
    		"first_name": "John",
    		"last_name": "Martin",
    		"employee_id": "12345",
    		"id": 1
    	},
    	{
    		"first_name": "Victoria",
    		"last_name": "Chiang",
    		"employee_id": "54321",
    		"id": 3
    	}
    ]
    }

    CREATE TECHNICIAN: This endpoint allows for the creation of a new technician in the database. You must provide a first name, last name, and employee ID.
        EXAMPLE INPUT:
            {
                "first_name": "John",
                "last_name": "Smith",
                "employee_id": "12345"
            }

        EXPECTED RESPONSE:
            {
                "first_name": "John",
                "last_name": "Smith",
                "employee_id": "12345",
                "id": 4
            }



    TECHNICIAN DETAILS: This endpoint returns all the details of a specific technician. No data input is required. However, you must specify the technician's ID number in the URL when sending the GET request.
        EXPECTED RESPONSE:
            {
                "first_name": "John",
                "last_name": "Martin",
                "employee_id": 12345,
                "id": 1
            }

    DELETE TECHNICIAN: Sending a DELETE request to this endpoint will remove the specified technician from the database. No data input is required, however you must specify the technicians ID in the URL.
        EXPECTED RESPONSE:
            {
                "deleted": "true"
            }




    ### Appointments

    Action | Method | URL

    List appointments | GET | http://localhost:8080/api/technicians/
    Create appointment | POST | http://localhost:8080/api/technicians/
    Delete appointment | DELETE | http://localhost:8080/api/technicians/id/
    Cancel appointment | PUT | http://localhost:8080/api/appointments/id/cancel/
    Finish appointment | PUT | http://localhost:8080/api/appointments/id/finish/


    LIST APPOINTMENTS: Sending a GET request to this endpoint will return a list of all existing appointments in the database. No data input is required.
        EXPECTED RESPONSE:
            {
    "appointments": [
    	{
    		"date_time": "2024-01-10T13:30:00.610386+00:00",
    		"reason": "Windshield Replacement",
    		"status": "Created",
    		"vin": "1C3CC5FB2AN120382",
    		"customer": "James Bond",
    		"id": 3,
    		"technician": {
    			"first_name": "John",
    			"last_name": "Martin",
    			"employee_id": "12345",
    			"id": 1
    		}
    	},
    	{
    		"date_time": "2023-12-26T12:00:00+00:00",
    		"reason": "Tire Rotation",
    		"status": "Created",
    		"vin": "1C3CC5FB2AN120339",
    		"customer": "Bill Brown",
    		"id": 6,
    		"technician": {
    			"first_name": "Victoria",
    			"last_name": "Chiang",
    			"employee_id": "54321",
    			"id": 3
    		}
    	}
    ]
    }

    CREATE APPOINTMENT: Sending a POST request to this endpoint allows you to create an appointment in the database. It will set the status of the appointment to "Created" by defaut upon form submission. This POST request requires a date/time, reason, VIN, customer, and technician for its input. (Status input is required if making the request from an API client like Insomnia).
        EXAMPLE INPUT:
            {
                "date_time": "2024-01-10T13:30:00.610386+00:00",
                "reason": "Windshield Replacement",
                "status": "Created",
                "vin": "1C3CC5FB2AN120382",
                "customer": "James Bond",
                "technician": "12345"
            }

        EXPECTED RESPONSE:
            {
                "date_time": "2024-01-10T13:30:00.610386+00:00",
                "reason": "Windshield Replacement",
                "status": "Created",
                "vin": "1C3CC5FB2AN120382",
                "customer": "James Bond",
                "id": 3,
                "technician": {
                    "first_name": "Zach",
                    "last_name": "Walkowiak",
                    "employee_id": 12345,
                    "id": 1
                }
            }

    DELETE APPOINTMENT: Sending a DELETE request to this endpoint will remove the specified appointment from the database. No data input is required, however you must specify the appointment ID in the URL when making the request.
        EXPECTED RESPONSE:
            {
                "deleted": "true"
            }

    CANCEL APPOINTMENT: Sending a PUT request to this endpoint will set the specified appointment's status to canceled. If making this request through an API client like Insomnia, you must specify the appointment ID in the URL, and you must pass JSON data to update the status to canceled as the data input.
        EXAMPLE INPUT:
            {
                "status": "Canceled"
            }

        EXPECTED RESPONSE:
            {
                "date_time": "2023-12-26T12:00:00+00:00",
                "reason": "Windshield Wiper Replacement",
                "status": "Canceled",
                "vin": "1C3CC5FB2AN120339",
                "customer": "Bill Brown",
                "id": 6,
                "technician": {
                    "first_name": "Victoria",
                    "last_name": "Chiang",
                    "employee_id": "54321",
                    "id": 3
                }
            }

    FINISH APPOINTMENT: Sending a PUT request to this endpoint will set the specified appointment's status to finished. If making this request through an API client like Insomnia, you must specify the appointment ID in the URL, and you must pass JSON data to update the status to finished as the data input.
        EXAMPLE INPUT:
            {
                "status": "Finished"
            }

        EXPECTED RESPONSE:
            {
                "date_time": "2023-12-21T16:30:00+00:00",
                "reason": "Engine Replacement",
                "status": "Finished",
                "vin": "1C3CC5FB2AN120174",
                "customer": "John Smith",
                "id": 4,
                "technician": {
                    "first_name": "John",
                    "last_name": "Martin",
                    "employee_id": "12345",
                    "id": 1
                }
            }

### Sales API

    ### Salespeople

​
Action | Method | URL

    List salespeople | GET | http://localhost:8090/api/salespeople/
    Create salesperson | POST | http://localhost:8090/api/salespeople/
    Delete salesperson | DELETE | http://localhost:8090/api/salespeople/:id/


    LIST SALESPEOPLE: This endpoint will return a list of all existing salespeople in the database. No data input is required.
        EXPECTED RESPONSE:
            {
                "salesperson": [
                    {
                        "first_name": "Bill",
                        "last_name": "Johnson",
                        "employee_id": "12345",
                        "id": 1
                    },
                    {
                        "first_name": "Jessica",
                        "last_name": "Smith",
                        "employee_id": "98765",
                        "id": 2
                    }
                ]
            }

    CREATE SALESPERSON: This endpoint allows you to create a salesperson to add to the database. The required data input includes a first name, last name, and employee ID.
        EXAMPLE INPUT:
            {
                "first_name": "Bill",
                "last_name": "Johnson",
                "employee_id": "12345"
            }

        EXPECTED RESPONSE:
            {
                "first_name": "Bill",
                "last_name": "Johnson",
                "employee_id": "12345",
                "id": 1
            }

    DELETE SALESPERSON: Sending a DELETE request to this endpoint will remove a specified salesperson from the database. There is no required data input, however you must specify the salesperson's ID in the URL when making the request.
        EXPECTED RESPONSE:
            {
                "deleted": "true"
            }



    ### Customers

    Action | Method | URL

    List customers | GET | http://localhost:8090/api/customers/
    Create customer | POST | http://localhost:8090/api/customers/
    Delete customer | DELETE | http://localhost:8090/api/customers/:id/

    LIST CUSTOMERS: This endpoint will return a list of all existing customers in the database. No data input is required.
        EXPECTED RESPONSE:
            {
                "customers": [
                    {
                        "first_name": "Homer",
                        "last_name": "Simpson",
                        "address_street": "123 First St",
                        "address_city": "Springfield",
                        "address_state": "MA",
                        "address_zip": "01020",
                        "phone": "4135550000",
                        "id": 1
                    },
                    {
                        "first_name": "Marge",
                        "last_name": "Simpson",
                        "address_street": "123 First St",
                        "address_city": "Springfield",
                        "address_state": "MA",
                        "address_zip": "01020",
                        "phone": "4138885500",
                        "id": 2
                    }
                ]
            }

    CREATE CUSTOMER: This endpoint allows you to create a customer to add to the database. The required data input includes a first name, last name, address, and phone number. When creating a customer using an API client like Insomnia, the address must be broken up into separate inputs to include the street, city, state and zip.
        EXAMPLE INPUT:
            {
                "first_name": "Homer",
                "last_name": "Simpson",
                "address_street": "123 First St",
                "address_city": "Springfield",
                "address_state": "MA",
                "address_zip": "01020",
                "phone": "4135550000"
            }

        EXPECTED RESPONSE:
            {
                "first_name": "Homer",
                "last_name": "Simpson",
                "address_street": "123 First St",
                "address_city": "Springfield",
                "address_state": "MA",
                "address_zip": "01020",
                "phone": "4135550000",
                "id": 1
            }

    DELETE CUSTOMER: Sending a DELETE request to this endpoint will remove a specified customer from the database. There is no required data input, however you must specify the customer's ID in the URL when making the request.
        EXPECTED RESPONSE:
            {
                "deleted": "true"
            }



    ### Sales

    Action | Method | URL

    List sales | GET | http://localhost:8090/api/sales/
    Create sale | POST | http://localhost:8090/api/sales/
    Delete sale | DELETE | http://localhost:8090/api/sales/:id/

    LIST SALES: This endpoint will return a list of all existing sales in the database. No data input is required.
        EXPECTED RESPONSE:
            {
                "sales": [
                    {
                        "automobile": {
                            "vin": "1C3CC5FB2AN120382",
                            "sold": false
                        },
                        "salesperson": {
                            "first_name": "Bill",
                            "last_name": "Johnson",
                            "employee_id": "12345",
                            "id": 1
                        },
                        "customer": {
                            "first_name": "Marge",
                            "last_name": "Simpson",
                            "address_street": "123 First St",
                            "address_city": "Springfield",
                            "address_state": "MA",
                            "address_zip": "01020",
                            "phone": "4138885500",
                            "id": 2
                        },
                        "price": 30500
                    },
                    {
                        "automobile": {
                            "vin": "1C3CC5FB2AN120339",
                            "sold": false
                        },
                        "salesperson": {
                            "first_name": "Bill",
                            "last_name": "Johnson",
                            "employee_id": "12345",
                            "id": 1
                        },
                        "customer": {
                            "first_name": "Homer",
                            "last_name": "Simpson",
                            "address_street": "123 First St",
                            "address_city": "Springfield",
                            "address_state": "MA",
                            "address_zip": "01020",
                            "phone": "4138885500",
                            "id": 1
                        },
                        "price": 38000
                    }
                ]
            }

    CREATE SALE: This endpoint allows you to create a sale to add to the database. The required data input includes automobile, salesperson, customer and a price. All fields except price are a foreign key, so automobile must be referenced by its VIN, salesperson referenced by their employee ID, and customer must be referenced by their ID.
        EXAMPLE INPUT:
            {
                "automobile": "1C3CC5FB2AN120382",
                "salesperson": "12345",
                "customer": "2",
                "price": 30500
            }

        EXPECTED RESPONSE:
            {
                "automobile": {
                    "vin": "1C3CC5FB2AN120382",
                    "sold": false
                },
                "salesperson": {
                    "first_name": "Bill",
                    "last_name": "Johnson",
                    "employee_id": "12345",
                    "id": 1
                },
                "customer": {
                    "first_name": "Marge",
                    "last_name": "Simpson",
                    "address_street": "123 First St",
                    "address_city": "Springfield",
                    "address_state": "MA",
                    "address_zip": "01020",
                    "phone": "4138885500",
                    "id": 2
                },
                "price": 30500
            }

    DELETE SALE: Sending a DELETE request to this endpoint will remove a specified sale from the database. There is no required data input, however you must specify the sale's ID in the URL when making the request.
        EXPECTED RESPONSE:
            {
                "deleted": "true"
            }

​

## Value Objects

    Both the Service Microservice and the Sales Microservice have one value object each: the AutomobileVO object in Service, and the AutoVO object in Sales. They both store a VIN number and sold status.
