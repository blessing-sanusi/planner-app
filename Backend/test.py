from db import db

def test_fetch_clients():
    docs = db.collection("clients").stream()
    clients = [doc.to_dict() for doc in docs]
    print(f"Found {len(clients)} clients")
    for c in clients:
        print(c)

if __name__ == "__main__":
    test_fetch_clients()
