# Generated by Django 3.1.7 on 2022-08-15 17:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls_app', '0006_polls_votes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='polls',
            name='votes',
        ),
    ]
