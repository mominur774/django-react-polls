# Generated by Django 3.1.7 on 2022-08-15 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls_app', '0005_choices_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='polls',
            name='votes',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
