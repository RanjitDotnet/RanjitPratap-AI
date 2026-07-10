// export default function StatusChart() {

//     return (

//         <div style={{
//             background: "#1f2937",
//             color: "white",
//             marginTop: "20px",
//             padding: "20px",
//             borderRadius: "10px"
//         }}>

//             <h2>Status Breakdown</h2>

//             <p>Doughnut chart will come here.</p>

//         </div>

//     )

// }



import Sidebar from "./Sidebar/Sidebar";

export default function DashboardLayout({ children }) {

    return (

        <div style={{display:"flex"}}>

            <Sidebar />

            <div style={{flex:1,padding:"20px"}}>

                {children}

            </div>

        </div>

    );

}