from supabase_client import supabase

response = supabase.table("analyses").select("*").limit(1).execute()

print("Supabase connection successful!")
print(response.data)