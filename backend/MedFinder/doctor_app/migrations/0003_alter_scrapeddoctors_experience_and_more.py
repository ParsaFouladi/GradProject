# Generated by Django 4.2.1 on 2023-05-28 20:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctor_app', '0002_scrapeddoctors'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scrapeddoctors',
            name='experience',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='scrapeddoctors',
            name='image_url',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='scrapeddoctors',
            name='location',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='scrapeddoctors',
            name='name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='scrapeddoctors',
            name='specialty',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='scrapeddoctors',
            name='url',
            field=models.CharField(max_length=200),
        ),
    ]