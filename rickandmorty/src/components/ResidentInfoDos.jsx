
const ResidentInfoDos = ({ residentData }) => {
    return (
        <div className="resident-card">
            <h2>{residentData?.name}</h2>
            <img src={residentData?.image} alt="" />
        </div>
    );
};

export default ResidentInfoDos;