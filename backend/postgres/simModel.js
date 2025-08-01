import pool from "./connectpg";

const error_msg = "No results found"
// Get all sims
const getSims = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query("SELECT * FROM sim", (error, results) => {
                if (error) {
                    reject(error)
                }

                if (results && results.rows) {
                    resolve(results.rows)
                } else {
                    reject(new Error(error_msg))
                }
            })
        })
    } catch (error_1) {
        console.error(error_1)
        throw new Error ("Internal server error")
    }
}

// Create a new sim
const createSim = (body) => {
    return new Promise(function (resolve, reject) {
        const { firstname, lastname, gender, causeOfDeath, ageOfDeath, professional } = body;

        pool.query(
            "INSERT INTO sim (firstname, lastname, gender, cause_of_death, age_of_death, professional) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [firstname, lastname, gender, causeOfDeath, ageOfDeath, professional],
            (error, results) => {
                if (error) {
                    reject(error)
                }

                if (results && results.rows) {
                    resolve(`A new sim has been added: ${JSON.stringify(results.rows[0])}`)
                } else {
                    reject(new Error(error_msg))
                }
            }
        )
    })
}

// Delete a sim
const deleteSim = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(
            "DELETE FROM sim WHERE id = $1",
            [id],
            (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(`Sim has been deleted with ID: ${id}`)
            }
        )
    })
}

// Update a sim
const updateSim = (id, body) => {
    return new Promise(function (resolve, reject) {
        const { firstname, lastname, gender, causeOfDeath, ageOfDeath, professional } = body;

        pool.query(
            "UPDATE sim SET firstname = $1, lastname = $2, gender = $3, cause_of_death = $4, age_of_death = $5, professional = $6 WHERE id = $7 RETURNING *",
            [firstname, lastname, gender, causeOfDeath, ageOfDeath, professional, id],
            (error, results) => {
                if (error) {
                    reject(error)
                }

                if(results && results.rows) {
                    resolve(`Sim updated: ${JSON.stringify(results.rows[0])}`)
                } else {
                    reject(new Error(error_msg))
                }
            }
        )
    })
}

module.exports = {
    getSims,
    createSim,
    deleteSim,
    updateSim
}