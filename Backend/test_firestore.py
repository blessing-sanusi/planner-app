from db import db

def test_firestore():
    try:
        doc_ref = db.collection('test_collection').document('test_doc')
        doc_ref.set({'message': 'Hello, Firestore!'})
        doc = doc_ref.get()
        print('Document data:', doc.to_dict())
        print("✅ Firestore connection successful!")
    except Exception as e:
        print("❌ Firestore connection failed:", e)

if __name__ == "__main__":
    test_firestore()
