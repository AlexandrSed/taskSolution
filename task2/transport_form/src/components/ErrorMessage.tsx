
type Props = {
    errors: string[] | undefined
}

export default function ErrorMessage({errors}: Props) {

    return (
        <>
        {
            errors?.map(err => 
                <p className="errorMessage">{err}</p>
            )
        }
        </>
    )

}