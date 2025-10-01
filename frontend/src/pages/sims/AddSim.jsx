import SimForm from "../../components/SimForm"
import { useTranslation } from "react-i18next"

export default function AddSim() {
    const {t} = useTranslation()

    return (
        <div class="container-fluid mt-4 card card-add-sim text-bg-dark mb-4">
            <div class="card-body">
                <h3 class="mb-4 card-header">{t('addSim')}</h3>
                <div class="card-text">
                    <SimForm props={{path: "add"}} />
                </div>
            </div>
        </div>
    )
}