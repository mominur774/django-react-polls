# Generated by Django 3.1.7 on 2022-08-13 16:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('polls_app', '0003_vote_option'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='polls',
            name='option1',
        ),
        migrations.RemoveField(
            model_name='polls',
            name='option2',
        ),
        migrations.RemoveField(
            model_name='polls',
            name='option3',
        ),
        migrations.RemoveField(
            model_name='polls',
            name='option4',
        ),
        migrations.RemoveField(
            model_name='polls',
            name='option5',
        ),
        migrations.RemoveField(
            model_name='vote',
            name='option',
        ),
        migrations.CreateModel(
            name='Choices',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choices', models.CharField(max_length=255)),
                ('polls', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='polls_app.polls')),
            ],
        ),
        migrations.AddField(
            model_name='vote',
            name='choices',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='polls_app.choices'),
        ),
    ]
