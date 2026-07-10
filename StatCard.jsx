export default function StatCard({ title, value }) {

    return (

        <div style={{
            width: "220px",
            background: "#1f2937",
            color: "white",
            padding: "20px",
            borderRadius: "10px"
        }}>

            <h4>{title}</h4>

            <h1>{value}</h1>

        </div>

    )

}