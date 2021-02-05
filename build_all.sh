cd backend || exit
cargo build --release

cd ..
cd frontend || exit
npm install
npm run-script build

