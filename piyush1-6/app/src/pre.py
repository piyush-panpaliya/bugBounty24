from .models import Society, Club


def run(db):
  societies = ["sntc", "cult"]
  Tclubs = ["kp", "gdsc", "saic"]
  Cclubs = ["drama", "dance", "music"]
  for s in societies:
    society = Society(name=s, budgetUsed=0)
    db.session.add(society)
  db.session.commit()
  sntc = Society.query.filter_by(name="sntc").first()
  cult = Society.query.filter_by(name="cult").first()
  for c in Tclubs:
    club = Club(name=c, society_id=sntc.id)
    db.session.add(club)
    sntc.clubs.append(club)
  for c in Cclubs:
    club = Club(name=c, society_id=cult.id)
    db.session.add(club)
    cult.clubs.append(club)
  db.session.commit()
