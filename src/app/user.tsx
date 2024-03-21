export default function UserPage() {
    return (
        <div>
            <h1>User Page</h1>
            <button onClick={() => localStorage.removeItem('token')}>
                cerrar sesión
            </button>
        </div>
    )
}