# Generated by Django 4.2.1 on 2023-05-28 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctor_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ScrapedDoctors',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=100)),
                ('specialty', models.CharField(max_length=50)),
                ('url', models.CharField(max_length=100)),
                ('experience', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('image_url', models.CharField(max_length=100)),
            ],
        ),
    ]
