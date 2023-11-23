export default function LogoutButton() {
    localStorage.removeItem('accessToken');

    return (
        <>
            <button>Logout</button>
        </>
    )
}