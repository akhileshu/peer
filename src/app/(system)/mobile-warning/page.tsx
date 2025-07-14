export default function MobileWarning() {
  return (
    <div className="flex min-h-screen items-center justify-center text-center p-4">
      <div className="max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">App Under Development</h1>
        <p className="text-gray-700">
          We are working on making this app mobile-friendly. For the best
          experience, please use a laptop or desktop.
        </p>
      </div>
    </div>
  );
}
