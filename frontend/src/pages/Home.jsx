import { useTranslation } from "react-i18next"

export default function Home() {
    const {t} = useTranslation()

    return <>
        <div class="container-fluid d-flex justify-content-center">
            <div class="card text-center card-home">
                <div class="card-body">
                    <h2 class="card-title">Sul sul!</h2>
                    <p class="card-text">
                        {t('text')}
                    </p>
                </div>
            </div>
        </div>
    </>
}