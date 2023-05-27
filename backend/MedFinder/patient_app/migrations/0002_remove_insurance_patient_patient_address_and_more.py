# Generated by Django 4.2.1 on 2023-05-27 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patient_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='insurance',
            name='patient',
        ),
        migrations.AddField(
            model_name='patient',
            name='address',
            field=models.CharField(default='Default address', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='patient',
            name='phone_number',
            field=models.CharField(default='', max_length=20),
            preserve_default=False,
        ),
        migrations.RemoveField(
            model_name='patient',
            name='insurance',
        ),
        migrations.DeleteModel(
            name='PatientContactInfo',
        ),
        migrations.AddField(
            model_name='patient',
            name='insurance',
            field=models.ManyToManyField(blank=True, null=True, to='patient_app.insurance'),
        ),
    ]