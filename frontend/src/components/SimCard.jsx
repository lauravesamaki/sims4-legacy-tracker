export default function SimCard({props}) {
    const name = `${props?.firstName} ${props?.lastName}`
    const gender = props?.gender
    const professional = props?.professional != null ? props?.professional : '-'

    return (
        <div class="card card-sim">
            <div class="card-body">
                <h5 class="card-title">{name}</h5>
                <hr class="hr" />
                <ul>
                    <li>{gender == 1 ? 'Female' : gender == 2 ? 'Male' : 'Other'}</li>
                    <li>{professional}</li>
                </ul>
            </div>
        </div>
    )
}