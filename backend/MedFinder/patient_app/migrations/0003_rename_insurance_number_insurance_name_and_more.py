# Generated by Django 4.2.1 on 2023-05-27 20:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patient_app', '0002_remove_insurance_patient_patient_address_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='insurance',
            old_name='insurance_number',
            new_name='name',
        ),
        migrations.AddField(
            model_name='insurance',
            name='number',
            field=models.CharField(default='1234', max_length=100),
            preserve_default=False,
        ),
    ]
