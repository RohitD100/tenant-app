import ButtonAppBar from "../components/AppBar";

export default function Welcome() {
  return (
    <>
      <ButtonAppBar />
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to the Tenant App!</h1>
      </div>
    </>
  );
}
