import pandas as pd
from ...models import ScrapedDoctors
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Imports scraped data into the ScrapedDoctors model"

    def handle(self, *args, **options):
        # Read the Excel file into a pandas DataFrame
        data = pd.read_excel("data.xlsx")
        data=data.drop_duplicates(subset='url', keep="last")
        # Iterate over the rows of the DataFrame and create ScrapedDoctors instances
        for _, row in data.iterrows():
            name = row["name"]
            location = row["location"]
            speciality = row["specialty"]
            experience = row["experience"]
            description = row["description"]
            url = row["url"]
            image_url = row["image_url"]

            # Create a new instance of ScrapedDoctors
            scraped_doctor = ScrapedDoctors(
                name=name,
                location=location,
                speciality=speciality,
                experience=experience,
                description=description,
                url=url,
                image_url=image_url,
            )

            # Save the instance to the database
            scraped_doctor.save()

        self.stdout.write(self.style.SUCCESS("Scraped data imported successfully."))
