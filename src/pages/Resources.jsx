import ResourceCards from "../ui/ResourceCards";

function Resources({ resourcesFastAccess, resourcesData, isLoading }) {
  return (
    <div className="flex flex-col gap-20  h-full">
      <ResourceCards
        resourcesFastAccess={resourcesFastAccess}
        resourcesData={resourcesData}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Resources;
