import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutoVO

def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            # Do not copy entire file

            url = "http://drive-sync-inventory-api-1:8000/api/automobiles"
            response = requests.get(url)
            content = json.loads(response.content)
            for auto in content["autos"]:
                AutoVO.objects.update_or_create(
                    vin=auto["vin"],
                    defaults={"sold": auto["sold"]}
                )
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
