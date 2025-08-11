import React from "react"

const SimList = ({sims}) => {
    return <div>
        <h2>Sims</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Professional</th>
                    <th scope="col">Cause Of Death</th>
                    <th scope="col">Age Of Death</th>
                </tr>
            </thead>
            <tbody>
                {sims.map((sim) => (
                    <tr key={sim.id}>
                        <td class="table-primary">{sim.firstName}</td>
                        <td class="table-primary">{sim.lastName}</td>
                        <td class="table-primary">{sim.gender}</td>
                        <td class="table-primary">{sim.professional}</td>
                        <td class="table-primary">{sim.causeOfDeath}</td>
                        <td class="table-primary">{sim.ageOfDeath}</td>
                        <td>
                            <button>Update</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default SimList