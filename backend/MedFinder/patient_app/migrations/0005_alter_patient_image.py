# Generated by Django 4.2.1 on 2023-06-17 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patient_app', '0004_patient_birth_date_patient_gender_patient_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='patient_images'),
        ),
    ]