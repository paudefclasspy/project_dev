import ibm_boto3
from ibm_botocore.client import Config

# Credenciales HMAC
COS_ACCESS_KEY_ID = "b3715dee3eb64aa88c5db9ddc82bde05"
COS_SECRET_ACCESS_KEY = "777913063c22c2375697a27c21dec0466f6ea573a44d4f93"

# Detalles del bucket y archivo
bucket_name = "somebucket-for-interview"
file_name = "README.md"

# Probar con diferentes endpoints para Madrid
endpoints = [
    "https://s3.eu-es.cloud-object-storage.appdomain.cloud",  # Madrid standard
    "https://s3.private.eu-es.cloud-object-storage.appdomain.cloud",  # Madrid private
    "https://s3.direct.eu-es.cloud-object-storage.appdomain.cloud"  # Madrid direct
]

for endpoint in endpoints:
    print(f"\nIntentando con endpoint: {endpoint}")
    
    try:
        # Crear cliente con este endpoint
        cos = ibm_boto3.client("s3",
            aws_access_key_id=COS_ACCESS_KEY_ID,
            aws_secret_access_key=COS_SECRET_ACCESS_KEY,
            endpoint_url=endpoint
        )
        
        # Intentar acceder directamente al archivo
        print(f"Descargando {file_name} de {bucket_name}...")
        
        # Obtener el objeto directamente
        response = cos.get_object(Bucket=bucket_name, Key=file_name)
        
        # Leer contenido
        content = response['Body'].read().decode('utf-8')
        
        # Guardar archivo localmente
        with open(file_name, 'w') as file:
            file.write(content)
            
        print(f"Archivo descargado como '{file_name}'")
        print(f"\nContenido del archivo:\n{content}")
        print("\n¡Descarga exitosa!")
        
        # Si llegamos aquí, fue exitoso
        break
        
    except Exception as e:
        print(f"Error con este endpoint: {e}")
        continue