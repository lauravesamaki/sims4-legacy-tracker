import SimForm from "../../components/SimForm"
import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function EditSim({props}) {
    const {t} = useTranslation()
    const data = useLocation()

    return <>
        <div class="container-fluid mt-4 card card-add-sim text-bg-dark mb-4">
            <div class="card-body">
                <h3 class="mb-4 card-header">{t('editSim')}</h3>
                <div class="card-text">
                    <SimForm props={{path: "edit", sim: data}} />
                </div>
            </div>
        </div>
    </>
}