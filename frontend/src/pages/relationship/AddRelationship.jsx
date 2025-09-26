import { useTranslation } from "react-i18next"
import RelationshipForm from "../../components/RelationshipForm"

export default function Tree() {
    const {t} = useTranslation()
    return (
        <div class="container-fluid mt-4 card card-add-sim text-bg-dark mb-4">
            <div class="card-body">
                <h3 class="mb-4 card-header">{t("addRelationship")}</h3>
                <RelationshipForm />
            </div>
        </div>        
    )
}