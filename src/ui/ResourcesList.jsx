import { HiOutlineFolder } from "react-icons/hi";
import { Link } from "react-router-dom";

function ResourcesList({ resourcesData, folderId, handleSubmit, formData , handleChange}) {
  console.log(resourcesData);
  return (
    <>
      <h2 className="text-2xl font-semibold flex items-center gap-3 mb-10 ">
        <HiOutlineFolder size={25} /> List
      </h2>
      <ul className="flex flex-wrap gap-5 ">
        {resourcesData &&
          resourcesData.map((resource) => (
            <li key={resource._id}>
              <Link to={resource.url} target="_blank" rel="noopener noreferrer">
                <div className="flex justify-center items-center gap-4 px-4 py-1 bg-[rgba(148,163,184,0.26)] hover:bg-[rgba(58,111,240,0.2)] hover:border-[rgba(58,111,240,0.5)] hover:text-[#bbb] rounded-lg border border-slate-400 transition-all ease-in-out duration-300">
                  <img
                    className="h-8 rounded-full"
                    src={resource.logoUrl}
                    alt=""
                  />

                  <span>{resource.name}</span>
                </div>
              </Link>
            </li>
          ))}
      </ul>

      <form onSubmit={(e) => handleSubmit(e, folderId)} className="data-form">
        <div className="form-group">
          <label>Data Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Logo URL:</label>
          <input
            type="text"
            name="logoUrl"
            value={formData.logoUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>URL:</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>

        {/* {error && <div className="error-message">{error}</div>} */}

        <button type="submit">Add Data</button>
      </form>
    </>
  );
}

export default ResourcesList;
