cd frontend || exit
npm install
npm run build
cd ..

cd backend || exit
cargo run --release