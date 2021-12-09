# Generated by Django 4.0 on 2021-12-09 09:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0003_auto_20211201_0822'),
        ('product', '0008_product_rating'),
        ('adminUser', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserReport',
            fields=[
                ('report_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='adminUser.report')),
            ],
            bases=('adminUser.report',),
        ),
        migrations.RemoveField(
            model_name='report',
            name='reportedUser',
        ),
        migrations.AddField(
            model_name='report',
            name='status',
            field=models.CharField(choices=[('pending', 'pending'), ('succesful', 'succesful'), ('rejected', 'rejected')], default='pending', max_length=50),
        ),
        migrations.CreateModel(
            name='ProductReport',
            fields=[
                ('report_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='adminUser.report')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product')),
            ],
            bases=('adminUser.report',),
        ),
        migrations.CreateModel(
            name='ProductCommentReport',
            fields=[
                ('report_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='adminUser.report')),
                ('comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='comment.productcomment')),
            ],
            bases=('adminUser.report',),
        ),
    ]
