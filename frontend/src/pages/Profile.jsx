import { useUser } from "@clerk/clerk-react";

function Profile() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Not signed in</h2>
        <p className="text-base-content/70">
          Please sign in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="card bg-base-200 shadow-md max-w-lg">
        <div className="card-body flex-row items-center gap-4">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src={user.imageUrl} alt={user.fullName} />
            </div>
          </div>
          <div>
            <h2 className="card-title">{user.fullName}</h2>
            <p className="text-base-content/70">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Your Products</h3>
        <p className="text-base-content/70">
          You haven't submitted any products yet.
        </p>
      </div>
    </div>
  );
}

export default Profile;
