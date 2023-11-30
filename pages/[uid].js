//Server Side Rendering...

function userProfile(props) {
  return <h1>{props.id}</h1>;
}
export default userProfile;

export async function getServerSideProps(context) {
  const { params } = context;
  const id = params.uid;
  return {
    props: { id: "Shivam" + id },
  };
}
