"""user verification

Revision ID: c274b86d61c6
Revises: 5a3a24e54668
Create Date: 2025-08-25 17:07:02.586470

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c274b86d61c6'
down_revision: Union[str, None] = '5a3a24e54668'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass


