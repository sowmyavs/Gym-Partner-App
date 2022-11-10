# upload image from local to google cloud storage
from google.cloud import storage
from io import BytesIO
import os

gcp_bucket_name="bigbuffbadgers"
gcp_key='key.json'
gcp_project_name="BigBuffBadgers"

class ImageManager:
    def store_image_gcp(gcp_image_name,image_path="../profile_image.jpg"):
        # get GCP key
        dir_path = os.path.dirname(os.path.realpath(__file__))
        gcp_key1 = os.path.join(dir_path, gcp_key)
        
        # Connect to GCP client
        storage_client = storage.Client.from_service_account_json(gcp_key1, project=gcp_project_name)
        bucket = storage_client.get_bucket(gcp_bucket_name)
        path = os.path.join(dir_path, image_path)
        
        # Create blob for file upload
        filename = "%s%s" % ('',path)
        blob = bucket.blob("profileimages/{}.jpg".format(gcp_image_name))
        blob.content_type = "image/jpeg"
        gcp_image_path=gcp_bucket_name+'/'+'profileimages'+'/'+gcp_image_name+'.jpg'
        
        # Upload image to GCP
        with open(path, 'rb') as f:
            blob.upload_from_file(f)

        # remove photo from local path immediately
        os.remove(path)
        print('Image Uploaded : ',gcp_image_path)

    # Returns a link to a specific GCP image
    def get_link(file_name):
        API_ENDPOINT = 'https://storage.googleapis.com'
        image_link = API_ENDPOINT + f"/{gcp_bucket_name}/profileimages/{file_name}.jpg"
        return image_link
        