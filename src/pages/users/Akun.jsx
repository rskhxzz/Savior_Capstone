import { useAkunHandler } from '../../script/utils/AkunHandler';
import backgroundImg from '../../assets/images/background/akun3.jpg';

const Akun = () => {
  const {
    userData,
    isEditing,
    editedData,
    setIsEditing,
    handleInputChange,
    handleSave,
    handleLogout,
  } = useAkunHandler();

  const isSaveDisabled =
    JSON.stringify(userData || {}) === JSON.stringify(editedData || {});

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">Memuat data...</p>
      </div>
    );
  }

  const allowedKeys = ['name', 'email', 'age', 'phoneNumber' , 'gender', 'address'];

  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="rounded-xl p-6 max-w-md w-full relative bg-white/20 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-gray-200 mb-4">Profil Akun</h1>
        <button
          className={`absolute top-4 right-4 text-white px-4 py-2 rounded flex items-center gap-2 ${
            isEditing ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={() => setIsEditing((prev) => !prev)}
          aria-label={isEditing ? 'Batalkan pengeditan' : 'Edit profil'}
        >
          {isEditing ? 'Batal' : 'Edit'}
        </button>
        <div className="space-y-3">
          {Object.entries(userData)
            .filter(([key]) => allowedKeys.includes(key))
            .map(([key, value]) => (
              <div key={key}>
                <label className="font-semibold capitalize">{key}:</label>
                {isEditing ? (
                  key === 'gender' ? (
                    <div className="mt-1">
                      <label className="mr-4">
                        <input
                          type="radio"
                          name="gender"
                          value="pria"
                          checked={editedData[key] === 'pria'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Pria
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="wanita"
                          checked={editedData[key] === 'wanita'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Wanita
                      </label>
                    </div>
                  ) : (
                    <input
                      type="text"
                      name={key}
                      value={editedData[key] || ''}
                      onChange={handleInputChange}
                      className="border rounded w-full p-2 mt-1"
                    />
                  )
                ) : (
                  <p>{value || '-'}</p>
                )}
              </div>
            ))}
        </div>
        {isEditing && (
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={handleSave}
              disabled={isSaveDisabled}
              className={`px-4 py-2 rounded ${
                isSaveDisabled
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              Simpan
            </button>
          </div>
        )}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-[#fa0000] text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Akun;
