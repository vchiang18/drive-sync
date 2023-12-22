import { useState, useEffect } from "react";

function AppointmentList() {

    const [ appointments, setAppointments ] = useState([]);
    const [ autos, setAutos ] = useState([]);
    const [ hasFinished, setHasFinished ] = useState(false);
    const [ hasCanceled, setHasCanceled ] = useState(false);

    const fetchAppointments = async() => {
        const url = 'http://localhost:8080/api/appointments/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setAppointments(data.appointments);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const fetchAutos = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const soldAutos = data.autos.filter(auto => {
                return auto.sold;
            })
            setAutos(soldAutos);
        }
    }

    useEffect(() => {
        fetchAppointments();
        fetchAutos();
    }, []);

    const vipVins = [];
    for (let auto of autos) {
        vipVins.push(auto.vin);
    }

    const handleCancel = async (e) => {
        const id = e.target.value;
        const url = `http://localhost:8080/api/appointments/${id}/cancel/`;

        const data = {
            status: "Canceled"
        };

        const fetchOptions = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(url, fetchOptions);
            if (response.ok) {
                const canceledAppt = await response.json();
                fetchAppointments();
                setHasCanceled(true);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleFinish = async (e) => {
        const id = e.target.value;
        const url = `http://localhost:8080/api/appointments/${id}/finish/`;

        const data = {
            status: 'Finished'
        };

        const fetchOptions = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(url, fetchOptions);
            if (response.ok) {
                const finishedAppt = await response.json();
                fetchAppointments();
                setHasFinished(true);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const finishMessage = (!hasFinished) ? 'd-none' : 'alert alert-success mb-0';
    const cancelMessage = (!hasCanceled) ? 'd-none' : 'alert alert-warning mb-0';

    return (
        <>
        <div className="container margin-bottom">
            <h1>Service Appointments</h1>
        </div>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">VIN</th>
                    <th scope="col">VIP?</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Technician</th>
                    <th scope="col">Reason</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>

                {appointments.map(appointment => {
                    if (appointment.status === 'Created') {
                    return (
                <tr key={appointment.id}>
                    <td>{appointment.vin}</td>
                    {vipVins.includes(appointment.vin)
                    ? <td>Yes</td>
                    : <td>No</td>
                    }
                    <td>{appointment.customer}</td>
                    <td>{appointment.date_time.slice(0, 10)}</td>
                    <td>{appointment.date_time.slice(11, 16)}</td>
                    <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                    <td>{appointment.reason}</td>
                    <td>
                        <button onClick={handleCancel} value={appointment.id} className="btn btn-danger">Cancel</button>
                        <button onClick={handleFinish} value={appointment.id} className="btn btn-success">Finished</button>
                    </td>
                </tr>
                    );
                    }
                })}

                {hasFinished
                ? <tr><td className={finishMessage} role="alert">Service has been completed!</td></tr>
                : null
            }

                {hasCanceled
                ? <tr><td className={cancelMessage} role="alert">Appointment has been canceled.</td></tr>
                : null
            }

            </tbody>
        </table>
        </>
    );
}

export default AppointmentList;
