def get_tasks_for_client(client_id: str):
    query = db.collection("tasks").where("clientId", "==", client_id)
    return query.stream()
