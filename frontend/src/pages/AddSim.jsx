import SimForm from "../components/SimForm"

export default function AddSim() {
    return (
        <div class="container-fluid mt-5 card text-bg-dark mb-3">
            <div class="card-body">
                <h3 class="mb-4 card-header">Add New Sim</h3>
                <div class="card-text">
                    <SimForm />
                </div>
            </div>
        </div>
    )
}