def format_response(data: dict, status: str = "success") -> dict:
    """
    Standardize API responses.
    """
    return {
        "status": status,
        "data": data
    }
