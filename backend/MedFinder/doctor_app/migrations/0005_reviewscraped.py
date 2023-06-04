# Generated by Django 4.2.1 on 2023-05-30 17:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('doctor_app', '0004_alter_scrapeddoctors_experience_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReviewScraped',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField(blank=True)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctor_app.scrapeddoctors')),
            ],
        ),
    ]