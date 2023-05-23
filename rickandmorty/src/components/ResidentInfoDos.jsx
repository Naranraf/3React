
const ResidentInfoDos = ({ residentData }) => {
    return (
        <div className="resident-card">
            <img src={residentData?.image}
             alt="" />
            <h2>Nombre: {residentData?.name}</h2>
            <h2>Estado: {residentData?.status}</h2>
            <h2>Origen: {residentData?.origin.name}</h2>
            <h2>Apariciones: {residentData?.episode?.length}</h2>
            
        </div>
    );
};

export default ResidentInfoDos;