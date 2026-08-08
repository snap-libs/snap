import os
import shutil

src_ja_dir = r"C:\work\RaconVoice\RaconVoice_V7\v7_samples\ja_native_showcase"
src_en_dir = r"C:\work\RaconVoice\RaconVoice_V7\v7_samples\en_native_showcase"
src_kr_dir = r"C:\work\snap\website\demo\audio"

dst_audio_dir = r"C:\work\snap\website\demo\audio"
os.makedirs(dst_audio_dir, exist_ok=True)

# 1. 한국어 파일 통일 복사
kr_mappings = {
    "sent1_revised_bus_KR_30sF_064_친절체.wav": "showcase_kr_1.wav",
    "sent2_date_counter_KR_40sM_022_친절체.wav": "showcase_kr_2.wav",
    "sent3_ai_percentage_KR_20sF_010_낭독체.wav": "showcase_kr_3.wav"
}

for src_name, dst_name in kr_mappings.items():
    src_p = os.path.join(src_kr_dir, src_name)
    dst_p = os.path.join(dst_audio_dir, dst_name)
    if os.path.exists(src_p):
        shutil.copy2(src_p, dst_p)
        print(f"[KR 복사] {src_name} -> {dst_name}")

# 2. 일본어 원어민 파일 통일 복사
ja_mappings = {
    "native_ja_sent1_yomi_revised_JP.wav": "showcase_jp_1.wav",
    "native_ja_sent2_counter_JP.wav": "showcase_jp_2.wav",
    "native_ja_sent3_percentage_JP.wav": "showcase_jp_3.wav"
}

for src_name, dst_name in ja_mappings.items():
    src_p = os.path.join(src_ja_dir, src_name)
    dst_p = os.path.join(dst_audio_dir, dst_name)
    if os.path.exists(src_p):
        shutil.copy2(src_p, dst_p)
        print(f"[JP 복사] {src_name} -> {dst_name}")

# 3. 영어 원어민 파일 통일 복사
en_mappings = {
    "native_en_sent1_heteronym_EN-US.wav": "showcase_en_1.wav",
    "native_en_sent2_numeral_EN-US.wav": "showcase_en_2.wav",
    "native_en_sent3_abbrev_EN-US.wav": "showcase_en_3.wav"
}

for src_name, dst_name in en_mappings.items():
    src_p = os.path.join(src_en_dir, src_name)
    dst_p = os.path.join(dst_audio_dir, dst_name)
    if os.path.exists(src_p):
        shutil.copy2(src_p, dst_p)
        print(f"[EN 복사] {src_name} -> {dst_name}")

print("\n[SUCCESS] 모든 9개 데모 오디오 파일 복사 완료!")
