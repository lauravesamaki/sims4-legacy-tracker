import SimForm from "../../components/SimForm"

export default function AddSim() {
    return (
        <div class="container-fluid mt-4 card card-add-sim text-bg-dark mb-4">
            <div class="card-body">
                <h3 class="mb-4 card-header">Add New Sim</h3>
                <div class="card-text">
                    <SimForm props={{path: "add"}} />
                </div>
            </div>
        </div>
    )
}