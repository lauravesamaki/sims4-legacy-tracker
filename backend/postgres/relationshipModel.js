import pool from "./connectpg";

const error_msg = "No results found";

// Get all relationships
const getRelationships = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query("SELECT * FROM relationship", (error, results) => {
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

// Create a new relationship 
const createRelationship = (body) => {
    return new Promise(function (resolve, reject) {
        const { simId, relatedToId, relationshipType } = body;

        pool.query(
            "INSERT INTO relationship (sim_id, related_to_id, relationship_type) VALUES ($1, $2, $3) RETURNING *",
            [simId, relatedToId, relationshipType],
            (error, results) => {
                if (error) {
                    reject(error)
                }

                if (results && results.rows) {
                    resolve(`A new relationship has been added to sim with ID: ${simId}`)
                } else {
                    reject(new Error(error_msg))
                }
            }
        )
    })
}

// Delete a relationship
const deleteRelationship = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(
            "DELETE FROM relationship WHERE id = $1",
            [id],
            (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(`Relationship has been deleted with ID: ${id}`)
            }
        )
    })
}

//Update relationship
const updateRelationship = (id, body) => {
    const { simId, relatedToId, relationshipType } = body;

    pool.query(
        "UPDATE relationship SET sim_id = $1, related_to_id = $2, relationship_type = $3 WHERE id = $4 RETURNING *",
        [simId, relatedToId, relationshipType, id],
        (error, results) => {
            if (error) {
                reject(error)
            }

            if (results && results.rows) {
                resolve(`Relationship has been updated: ${JSON.stringify(results.rows[0])}`)
            } else {
                reject(new Error(error_msg))
            }
        }
    )
}

module.exports = {
    getRelationships,
    createRelationship,
    deleteRelationship,
    updateRelationship
}