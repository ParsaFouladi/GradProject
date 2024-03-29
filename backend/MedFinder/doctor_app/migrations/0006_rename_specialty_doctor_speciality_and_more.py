# Generated by Django 4.2.1 on 2023-06-01 14:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('doctor_app', '0005_reviewscraped'),
    ]

    operations = [
        migrations.RenameField(
            model_name='doctor',
            old_name='specialty',
            new_name='speciality',
        ),
        migrations.RenameField(
            model_name='scrapeddoctors',
            old_name='specialty',
            new_name='speciality',
        ),
        migrations.CreateModel(
            name='TimeSlotScraped',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('status', models.CharField(max_length=20)),
                ('description', models.TextField(blank=True)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctor_app.scrapeddoctors')),
            ],
        ),
        migrations.CreateModel(
            name='TimeSlot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('status', models.CharField(max_length=20)),
                ('description', models.TextField(blank=True)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctor_app.doctor')),
            ],
        ),
    ]
