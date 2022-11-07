# upload image from local to google cloud storage



from google.cloud import storage
from IPython.display import Image
from io import BytesIO
import os
import json

gcp_bucket_name="bigbuffbadgers"
#gcp_image_name="testimage"
gcp_key='key.json'
gcp_project_name="BigBuffBadgers"
image_path="/Users/sowmyavemparala/Downloads/flower.jpg"


def store_image_gcp(gcp_image_name,image_path="../profile_image.jpg"):
    
    dir_path = os.path.dirname(os.path.realpath(__file__))
    gcp_key1 = os.path.join(dir_path, gcp_key)
    
    
    
    storage_client = storage.Client.from_service_account_json(gcp_key1, project=gcp_project_name)
    bucket = storage_client.get_bucket(gcp_bucket_name)
    path = os.path.join(dir_path, image_path)
    
    filename = "%s%s" % ('',path)
    blob = bucket.blob("profileimages/{}.jpg".format(gcp_image_name))
    blob.content_type = "image/jpeg"
    gcp_image_path=gcp_bucket_name+'/'+'profileimages'+'/'+gcp_image_name+'.jpg'
    with open(path, 'rb') as f:
        blob.upload_from_file(f)
    print('Image Uploaded : ',gcp_image_path)
#store_image_gcp('sunflower2',"../sunflower2898.jpg")


def get_image():
    storage_client = storage.Client.from_service_account_json(gcp_key, project=gcp_project_name)
    bucket = storage_client.get_bucket(gcp_bucket_name)
    blob = bucket.get_blob('profileimages/sunflower.jpg')
    print("BLOB",blob)
    blob.download_to_filename('/Users/sowmyavemparala/Desktop/project/letsgetphysical10.3/backend/api/sunflower.jpg')
    #Image.dispay(blob.download_as_bytes())
    #Image(blob.download_as_bytes())
    
#get_image()

    
    
    





